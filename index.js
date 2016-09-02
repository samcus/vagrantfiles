var fs = require('fs'),
program = require('commander');

var errorPrefix = "Vagrantfile Error: ";

module.exports = {
  checkSuccess: function(cb){
   if((bootstrapSuccess === true) && (vagrantfileSuccess === true)){
     cb(null, true);
     //return success;
   }
  },
  create: function(configuration, cb){
    that = this;
    vagrantfileSuccess = false;
    bootstrapSuccess = false;
    if(typeof(configuration) != "string"){
      //throw errorPrefix + "Configuration should be a string"
      cb("Configuration should be a string", null);
    }
    this.copy(configuration, function(err,success){
      if (err) throw err;
      if (success){
        //console.log(success);
        cb(null,success);
      }
    });
  },
  copy: function(configuration, cb){
    var vagrantfileRS = fs.createReadStream('vagrantfiles/'+configuration+'/Vagrantfile')
      .on('error',function(err){
        //throw "Vagrantfile Error: Vagrantfile Configuration Does Not Exist (Yet)"
        cb("Vagrantfile Error: Vagrantfile Configuration Does Not Exist (Yet)", null);
      })
      .on('data',function(data){
        //console.log(data.toString());
        fs.writeFile('Vagrantfile', data, function(err){
          //if(err) throw err;
          if(err) cb("Could not write file", null);
          vagrantfileSuccess = true;
          that.checkSuccess(function(success){
            if(success) cb(null, success)
          });
        });
      });
    var bootstrapRS = fs.createReadStream('vagrantfiles/'+configuration+'/bootstrap.sh')
      .on('error',function(err){
        //throw "Vagrantfile Error: Vagrantfile Configuration Does Not Exist (Yet)"
        cb("Vagrantfile Error: Vagrantfile Configuration Does Not Exist (Yet)", null);
      })
      .on('data',function(data){
        //console.log(data.toString());
        fs.writeFile('bootstrap.sh', data, function(err){
          //if(err) throw err;
          if (err) cb(err, null);
          bootstrapSuccess = true;
          that.checkSuccess(function(success){
            if(success) cb(null, success)
          });
        });
      });
  }
};
