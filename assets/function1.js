

var today = new Date()
console.log("TCL: today", today)


var divArea2 = document.getElementById('div-to-do-list')
var table1 = document.getElementById("table1");


var listThingsToDo = []


function deleteRow(r) 
{
  var i = r.parentNode.parentNode.rowIndex;
  console.log("TCL: i", i)
  document.getElementById("table1").deleteRow(i);
}


document.getElementById('buttonSubmit').addEventListener('click', function ()
{
    var validationCounter = 0 

    // 1. validation Date
    var dateContent = new Date(document.getElementById('inputDate').value )
    console.log("TCL: dateContent", dateContent)

    if (dateContent == "Invalid Date")
      {
        alert('Date empty')
      }
    else if (dateContent < today)
      {
        alert('Date can\'t be before Today')
      }
    else
      {
        var listDate = dateContent.toDateString()
        console.log("TCL: listDate", listDate)
        validationCounter ++
      }


    // 2. validation Things to Do
    var thingsToDoContent = document.getElementById('thingsToDo').value
    console.log("TCL: thingsToDoContent", thingsToDoContent)

    if (thingsToDoContent === "")
      {
        alert('Things-to-Do empty')
      }
    else
      {
        thingsToDoContent = document.getElementById('thingsToDo').value
        validationCounter ++
      }


    // 3. no need for validation
    var notes = document.getElementById('notes').value


    // 4.
    if (validationCounter === 2)
      {
        // 1.
        listThingsToDo.push([listDate, thingsToDoContent, notes])
        
        document.getElementById('inputDate').value = ''
        document.getElementById('thingsToDo').value =''
        document.getElementById('notes').value =''

        alert('Submit Success')


        listThingsToDo = listThingsToDo.sort(function(a,b) 
                        { return new Date(a[0])- new Date(b[0]) }  ) 
        console.log("TCL: listThingsToDo", listThingsToDo)

        

        // 2.
        var groupingList = {}
        for (var x = 0; x < listThingsToDo.length; x++)
          {
            if (groupingList[listThingsToDo[x][0]] === undefined)
              {
                groupingList[listThingsToDo[x][0]] = 
                [{thingsToDo : listThingsToDo[x][1], notes : listThingsToDo[x][2]}]
              }
            else
              {
                groupingList[listThingsToDo[x][0]].push(
                    {thingsToDo : listThingsToDo[x][1], notes : listThingsToDo[x][2]})
              }
          }
        console.log('groupingList =', groupingList)



        // 3.
        table1.innerHTML = ""

        var groupingListKeys = Object.keys(groupingList)
        for (var x = 0; x < groupingListKeys.length; x++)
          {
              var tr = document.createElement('tr')
              var td = document.createElement('td')
              
              tr.setAttribute('class', 'class-tr-header')
              td.setAttribute('colspan', '3')

              td.innerHTML = groupingListKeys[x]
              tr.appendChild(td)
              table1.appendChild(tr)
            

              for (var y = 0 ; y < groupingList[groupingListKeys[x]].length ; y++)
                {
                  var tr = document.createElement('tr')
                  var td1 = document.createElement('td')
                  var td2 = document.createElement('td')
                  var td3 = document.createElement('td')
                  var inputButtonX = document.createElement('input')
                  
                  td1.setAttribute('class', 'class-td-ttd')
                  td2.setAttribute('class', 'class-td-notes')
                  // td3.setAttribute('class', 'class-td-closer')
                  inputButtonX.setAttribute('type', 'button')
                  inputButtonX.setAttribute('class', 'buttonCloser')
                  inputButtonX.setAttribute('value', 'x')
                  inputButtonX.setAttribute('onclick', 'deleteRow(this)')

                  td1.innerHTML = groupingList[groupingListKeys[x]][y].thingsToDo
                  td2.innerHTML = groupingList[groupingListKeys[x]][y].notes 
                  
                  
                  tr.appendChild(td1)
                  tr.appendChild(td2)
                    td3.appendChild(inputButtonX)
                  tr.appendChild(td3)
                  table1.appendChild(tr)
                }
              
              
          }


      }
     
      


})


