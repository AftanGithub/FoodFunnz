const stripe = Stripe("pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3");
const user = JSON.parse(localStorage.getItem('user'));
let items = JSON.parse(localStorage.getItem('cartData'));
let amount = localStorage.getItem('amount');
let paymCard = document.getElementById('payAmountCard');
paymCard.innerHTML = `<h5>Amount</h5><h4 class="fs-3 text-secondary">$${amount}</h4>`
if(!user && !user.token){
    showToast('<span class="text-danger">Error</span>','Please Login to complete checkout!','/login.html');
}
let elements;

initialize();
checkStatus();

document
  .querySelector("#payment-form")
  .addEventListener("submit", handleSubmit);

let emailAddress = '';
// Fetches a payment intent and captures the client secret
async function initialize() {
  const response = await fetch(SERVER_URI+"api/payments/create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  const { clientSecret } = await response.json();
  console.log(clientSecret);
  const appearance = {
    theme: 'stripe',
  };
  elements = stripe.elements({ appearance, clientSecret });

  const linkAuthenticationElement = elements.create("linkAuthentication");
  // Create the Address Element in shipping mode
  var addressElement = elements.create('address', {
    mode: 'shipping',
  });
  addressElement.mount('#shipping-element')
  linkAuthenticationElement.mount("#link-authentication-element");

  linkAuthenticationElement.on('change', (event) => {
    emailAddress = event.value.email;
  });

  const paymentElementOptions = {
    layout: "tabs",
  };

  const paymentElement = elements.create("payment", paymentElementOptions);

  paymentElement.mount("#payment-element");
}

async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);

  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      // Make sure to change this to your payment completion page
      return_url: SERVER_URI+"checkout.html",
      
      receipt_email: emailAddress,
    },
  });

  console.log(error);
  if (error.type === "card_error" || error.type === "validation_error") {
    showMessage(error.message,true);
  } else {
    
    showMessage("An unexpected error occurred.",true);
  }

  setLoading(false);
}

// Fetches the payment intent status after payment submission
async function checkStatus() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  if (!clientSecret) {
    return;
  }

  const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
  console.log(paymentIntent);
  switch (paymentIntent.status) {
    case "succeeded":
      createNewOrder(paymentIntent);
      showMessage("Payment succeeded!",false);
      break;
    case "processing":
      showMessage("Your payment is processing.",true);
      break;
    case "requires_payment_method":
      showMessage("Your payment was not successful, please try again.",true);
      break;
    default:
      showMessage("Something went wrong.",true);
      break;
  }
}

async function createNewOrder(paymentIntent){
    const cartData = JSON.parse(localStorage.getItem('cartData'));
 let data = {
    User:user.id,
    foods:cartData,
    paymentDetails:{
      transationId:paymentIntent.id,
      email:paymentIntent.receipt_email,
      amount:paymentIntent.amount,
      shipping_address:paymentIntent.shipping,
    },
    status:'Processing'
 };
 try{
  console.log(data);
  const response = await fetch(SERVER_URI+'api/orders/create-new-order',{
    method:'POST',
    headers: {
        "Content-Type": "application/json",
        'x-access-token':user?.token
      },
    body:JSON.stringify(data)
  });

  const result = await response.json();
  console.log(result);
  if(response.status===200){
    showToast('<span class="text-success">Order Status</span>','Order Sent Successfully!');
    localStorage.removeItem('cartData')
  }

 }catch(err){
  console.log(err);
  showToast('<span class="text-danger">Error</span>',err);

 }
 console.log(data);
}

// ------- UI helpers -------

function showMessage(messageText,isError) {
  const messageContainer = document.querySelector("#payment-message");
  const msgCardWrapper = document.querySelector('#msgCardWrapper');
  const messageImgIcon = document.querySelector('#resultImg');
  const paymentFormWrapper = document.getElementById('paymentFormWrapper');
  paymentFormWrapper.classList.add('hidden');
  msgCardWrapper.classList.remove('hidden');
  // console.log(msgCardWrapper)
  if(isError){
    messageImgIcon.setAttribute('src','./assets/cross.png');
  }else{
    messageImgIcon.setAttribute('src','./assets/check.png');
  }

  // console.log(messageText);
  
  messageContainer.textContent = messageText;

  if(isError){
    setTimeout(function () {
      paymentFormWrapper.classList.remove('hidden');
      msgCardWrapper.classList.add("hidden");
      messageContainer.textContent = "";
    }, 4000);
  }
 
}

// Show a spinner on payment submission
function setLoading(isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("#submit").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("#submit").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
}