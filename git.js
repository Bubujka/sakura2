var exec = require('child_process').exec;

module.exports = {
  clone: function(url, path, cb){
    exec('git clone --mirror '+url+' '+path, cb);
  },
  update: function(path, cb){
    exec('git --git-dir='+path+' fetch -p origin', cb);
  },
  branch_commit_id: function(path, branch, cb){
    exec('git --git-dir='+path+' rev-parse '+branch, function(err, stdout){
      if(err){
        return cb(err);
      }
      cb(null, stdout.trim());
    });
  },
  branches: function(path, cb){
    exec('git --git-dir='+path+' branch  | sed \'s/^[* ]*//\'', function(err,stdout){
      if(err){
        return cb(err);
      }
      cb(null, stdout.trim().split('\n'));
    });
  },
  archive: function(path, branch, archive, cb){
    exec('git --git-dir='+path+' archive --format=tar --prefix=www/ '+branch+' > '+archive, function(err){
      if(err){
        return cb(err);
      }
      cb(null);
    });
  }
};
