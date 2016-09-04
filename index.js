var fs = require('fs'),
program = require('commander');

var errorPrefix = "Vagrantfile Error: ";
/**
 * Vagrantfiles Module
 *
 * @module index.js
 */
module.exports = {
  /**
   * Checks the status of the Vagrantfile configuration creation
   * @param {Function} Callback
   * @returns {Number}
   */
  checkSuccess: function(cb){
   if((bootstrapSuccess === true) && (vagrantfileSuccess === true)){
     //console.log("okaynow!");
    return cb(null, 1);
   }
  },
  /**
   * Request the creation of a Vagrantfile configuration
   * @param {Object} Configuration
   * @returns {Function}
   */
  create: function(configuration, cb){
    that = this;
    vagrantfileSuccess = false;
    bootstrapSuccess = false;
    if(typeof(configuration) != "string"){
      //throw errorPrefix + "Configuration should be a string"
      cb("Configuration should be a string", null);
    }
    this.copy(configuration, function(err,success){
      if (err) cb(err,null)//;throw err;
      if (success){
        //console.log(success);
        cb(null,success);
        //console.log(1);
        //this.checkSuccess();
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
        fs.writeFile('Vagrantfile', data, function(err){
          if(err) cb("Could not write file", null);
          else {
            vagrantfileSuccess = true;
            that.checkSuccess(function(){
              cb(null, "Created Vagrantfile and Bootstrap Successfully");
            });
          }
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
          else{
            bootstrapSuccess = true;
            that.checkSuccess(function(){
              cb(null, "Created Vagrantfile and Bootstrap Successfully");
            });
          }
        });
      });
    }
};
