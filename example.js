vagrantfiles = require('./index');
//console.log(2);
vagrantfiles.create("node", function(err, success){
  if(err) {
    console.log(err);
  }
  if(success) {
    console.log(success);
  }
});
