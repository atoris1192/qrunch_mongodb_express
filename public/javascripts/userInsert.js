document.addEventListener('DOMContentLoaded', () => {
  'use strict'

  console.log('-- userInsertjs log --')

  const userInsertName = document.getElementById('userInsertName')
  const userInsertAge = document.getElementById('userInsertAge')
  const userInsertWeight = document.getElementById('userInsertWeight')
  const userInsertHeight = document.getElementById('userInsertHeight')
  const btn = document.getElementById('btn')
  const resetBtn = document.getElementById('resetBtn')
  const userInsertResult = document.getElementById('userInsertResult')

  resetBtn.addEventListener('click', () => {
        userInsertResult.textContent = ''
        userInsertName.value = ''
        userInsertAge.value = ''
        userInsertHeight.value = ''
        userInsertWeight.value = ''

  })

  btn.addEventListener('click', () => {

    const name = userInsertName.value
    const age = Number(userInsertAge.value)
    const weight = Number(userInsertWeight.value)
    const height = Number(userInsertHeight.value)


    const objData = {
      name: name,
      age: age,
      height: height,
      weight: weight
    }
    const data = new URLSearchParams(objData)
    console.log('objData: ', objData)
    console.log('URLserchParams data: ', data)
    
    const options = {
      method: 'POST',
      body : data,
    }
    
    const main = async() => {
      try {
        let res = await fetch('http://localhost:3000/api/insertonepost', options)
        if (!res.ok) throw new Error(response.statusText)
        console.log('res: ', res)
      
      } catch(e) {
        console.error('エラー', e.message)
      }
    }
    main()
        userInsertResult.textContent = 'Done!'


    
    // fetch('http://localhost:3000/api/insertonepost', options)
    //   .then(response => {
    //     if (!response.ok) {
    //       throw Error(response.statusText)
    //     }	
    //     return response
    //   })
    //   .then(response => {
    //     console.log(response)
    //   })
    //   .catch(err => console.error(err))
    
  })

})