console.log('Client side javascript file is loaded!')

fetch('http://localhost:3000/weather?address=!').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data)
        }
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit',(e) => {

    e.preventDefault()
    const location=search.value
    console.log(location)

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
      
    response.json().then((data) => {
        messageOne.textContent = 'Loading...'
        if (data.error) {
            messageOne.textContent =""
            messageTwo.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = 'Latitude: '+ data.latitude + '\n' +
            'Longitude: ' + data.longitude + '\n' +
            'Humidity: ' + data.humidity
        }
    })
})
    
})