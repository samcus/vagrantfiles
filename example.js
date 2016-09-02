vagrantfiles = require('./index');

//vagrantfiles.create(1);
vagrantfiles.create("node", function(err, success){
  if(err) throw err;
  if(success) console.log("Success!")
});
//vagrantfiles.bin();
