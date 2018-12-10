document.addEventListener('DOMContentLoaded', () => {
  'use strict'

  const result = document.querySelector('#result')

  console.log('-- userEdit.js log --')


  btn.addEventListener('click', () => {
    const array = []
    const inputs = document.querySelectorAll('input')
    for(let input of inputs) {
      array.push(input.value)
    }
    console.log('array: ', array)

    const objData = {
      _id   : array[0],
      name  : array[1],
      age   : array[2],
      weight: array[3],
      height: array[4]
    }
    
    // http://localhost:3000/user_edit?_id=5c0b9fd4101376cd30804fea 

    const data = new URLSearchParams(objData)
    console.log('objData: ', objData)
    console.log('URLserchParams data: ', data.toString())
    
    const options = {
      method: 'POST',
      body : data,
    }
    
    const main = async() => {
      try {
        let res = await fetch('http://localhost:3000/api/updateone', options)
        if (!res.ok) throw new Error(response.statusText)
        console.log('res: ', res)
      
      } catch(e) {
        console.error('エラー', e.message)
      }
    }
    main()
    result.textContent = 'Update!'

  })

})