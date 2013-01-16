



var App = {

    init: function () {

        this.renderMFS();
    },

    renderMFS: function() {

        // Debug
        /*
         FB.api('/me/friends', function(response) {
         alert(JSON.stringify(response.data))
         });
         /

         /
         // First get the list of friends for this user with the Graph API
         FB.api('/me/friends', function(response) {
         var container = document.getElementById('mfs');
         var mfsForm = document.createElement('form');
         mfsForm.id = 'mfsForm';

         // Iterate through the array of friends object and create a checkbox for each one.
         for(var i = 0; i < Math.min(response.data.length, 10); i++) {
         var friendItem = document.createElement('div');
         friendItem.id = 'friend_' + response.data[i].id;
         friendItem.innerHTML = '<input type="checkbox" name="friends" value="'
         + response.data[i].id
         + '" />' + response.data[i].name;
         mfsForm.appendChild(friendItem);
         }

         var friendItem = document.createElement('div');
         friendItem.id = 'bouton';
         friendItem.innerHTML = '<input type="button" name="friends" value="button" onclick = "sendRequest()"/>';
         mfsForm.appendChild(friendItem);


         container.appendChild(mfsForm);


         });
         */

        this.isFriendAlreadyUsing();
    },

    isFriendAlreadyUsing: function() {
        alert(this.fbFunction());
    },

    fbFunction:function() {
        var self = this,
        friends_array

        FB.api('/me/friends', function(response) {

            for(i = 0; i < Math.min(response.data.length, 10); i++) {
                friend_id = response.data[i].id;
                friends_list += friend_id+",";
            }

            //alert(friends_list);
            $.ajax({
                type: "POST",
                url: $("#invite_friends_button").data("check-existing-members-url"),
                data: {
                    'friends_list' : friends_list
                },
                complete: function(data){
                    self.friends_array = data.responseText;
                }
            });
        });

        return self.friends_array;
    }

};

App.init();