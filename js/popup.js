export class PopUp{
  function openPopup () {
    // Display the pop-up
    $('#load-pop-up').show('fast', 'swing')
  }

  function closePopup () {
    // Hide the pop-up
    $('#load-pop-up').hide('fast', 'swing')
  }

  function popupText (text) {
    document.getElementById('load-pop-up-text').textContent = text
  }
}
