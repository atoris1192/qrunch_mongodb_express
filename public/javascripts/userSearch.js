document.addEventListener('DOMContentLoaded', () => {
  'use strict'

  const userSearchInput = document.getElementById('userSearchInput')
  const userSearchSelect = document.getElementById('userSearchSelect')
  const userSearchBtn = document.getElementById('userSearchBtn')
  const userSearchResult = document.getElementById('userSearchResult')

  userSearchBtn.addEventListener('click', () => {

    const key = userSearchSelect.value
    const value = userSearchInput.value  
    const input = `${key}=${value}`
    userSearchResult.innerHTML = `<p>Link: <a href="http://localhost:3000/api/search?${input}"/>${value}</p>`
    
  })
})