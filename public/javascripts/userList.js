
document.addEventListener('DOMContentLoaded', () => {
  'use strict'

  console.info('-- userList.js log --')
  const lis = document.querySelectorAll('li.data')
  const removeBtn = document.querySelector('#removeBtn')
  const editBtn = document.querySelector('#editBtn')
  const userEditLink = document.querySelector('#userEditLink')

  let checkArray = []
    

  for(let li of lis) {
    li.addEventListener('change', (e) => {
      if (e.target.checked) {
        console.log('checked')
        checkArray.push(e.target.value)
      } else {
        console.log("removed");
       for(let i=0,length=checkArray.length; i<length; i++)  {
        if (checkArray[i] === e.target.value) {
          checkArray.splice(i, 1)
        }
       }
      }
      console.log(checkArray);
    })
  }

  editBtn.addEventListener('click', () => {
    console.log('edit btn click')
      const editData = checkArray[0]
      const data = new URLSearchParams()
      data.set("_id", editData)
      console.log('URLSearchParams: ', data.toString())

      userEditLink.innerHTML = `<p><a href="http://localhost:3000/user_edit?${data}"/>Edit Link</p>`

      // const options = {
      //   method: 'GET',
      // }
      // const main = async() => {
      //   try {
      //     let res = await fetch('http://localhost:3000/user_edit?'+data, options)
      //     if (!res.ok) throw new Error(response.statusText)
      //     console.log('res: ', res)
        
      //   } catch(e) {
      //     console.error('エラー', e.message)
      //   }
      // }
      // main()
  })

    
  removeBtn.addEventListener('click', () => {
      const data = new URLSearchParams()
      checkArray.forEach((item, index) => {
        data.set(index, item)
      })

      console.log('URLSearcParams ids: ', data.toString())
    
      const options = {
        method: 'DELETE',
        body : data,
      }
    
      const main = async() => {
        try {
          let res = await fetch('http://localhost:3000/api/removeuser', options)
          if (!res.ok) throw new Error(response.statusText)
          console.log('res: ', res)
        
        } catch(e) {
          console.error('エラー', e.message)
        }
      }
      main()
      location.reload()
    }) 

})