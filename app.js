$(document).ready(function(){

    var firebaseConfig = {
        apiKey: "AIzaSyCABc3EuaZTpHRtCyHrrmI9ORjwaIFTUC4",
        authDomain: "todoapp-3fa11.firebaseapp.com",
        databaseURL: "https://todoapp-3fa11.firebaseio.com",
        projectId: "todoapp-3fa11",
        storageBucket: "todoapp-3fa11.appspot.com",
        messagingSenderId: "273467972324",
        appId: "1:273467972324:web:a42b3eb2c64d17fe92eaf1"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    let todo = firebase.database().ref('todo');

    todo.on('value',function(snapshot){
        

        let data = snapshot.val();

        $('#pending').html('');
        $('#completed').html('');

        for(let key in snapshot.val()){

            let status = data[key].status;

            if (status === 'Pending'){
                $('#pending').append(`
                <div class="card ">
                    <div class="card-body">
                        <h5>${data[key].task}</h5>
                        <button data-id=${key} class="btn btn-danger btn-sm delete">Delete</button>
                        <button data-id=${key} class="btn btn-success btn-sm complete">Completed</button>
                    </div>
                </div>
                `);
            }else {
                $('#completed').append(`
                <div class="card ">
                    <div class="card-body">
                        <h5>${data[key].task}</h5>
                    </div>
                </div>
                `);
            };
        };
    });
    
    $('#add-task').click(function (){
        let task = $('#task-input').val();

        let todoRef = todo.push({
            task : task,
            status : "Pending"
        });

        $('#task-input').val('');

    });

    $('#pending').on('click','.delete',function(){
        
        let taskId = $(this).data("id");
        firebase.database().ref('todo/'+ taskId).remove();
    });

    $('#pending').on('click','.complete',function(){
        
        let taskId = $(this).data("id");
        firebase.database().ref('todo/'+ taskId).update({
            status:'Completed'
        });
    });


})