// Push Notifications
const subscribeButton = document.querySelector('.subscribe-button');
let isSubscribed = false;
let swRegistration = null;

const applicationServerPublicKey = 'BJl9GPL3yeZQW-FwPx0P_dJ2D6cBNLf_67UgxYG0mseJKWBPj-kpk4-qlM6zNEKZ8J3tnp_MnABzLlCvyUO-RE0';


function getSubsciptionStatus() {
  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
    .then(function(subscription) {
      isSubscribed = !(subscription === null);

      if (isSubscribed) {
        console.log('User IS subscribed.');
        console.log(subscription);
      } else {
        console.log('User is NOT subscribed.');
      }

      subscribeButton.addEventListener('click', function() {
        if (isSubscribed) {
          unsubscribeUser();
          console.log('User has been unSubscribed.');
        } else {
          subscribeUser();
          console.log('User has been subscribed.');
        }
      })
  });
}

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}


function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    console.log('User is subscribed:', JSON.stringify(subscription));

    // updateSubscriptionOnServer(subscription);

    isSubscribed = true;
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
  });
}

function unsubscribeUser() {
  swRegistration.pushManager.getSubscription()
    .then(function(subscription) {
      if (subscription) {
        return subscription.unsubscribe();
      }
    })
    .catch(function(error) {
      console.log('Error unsubscribing', error);
    })
    .then(function() {
      // updateSubscriptionOnServer(null);

      console.log('User is unsubscribed.');
      isSubscribed = false;

    });
}
