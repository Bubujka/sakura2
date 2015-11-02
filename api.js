var express = require('express');
var git = require('./git.js');
var app = require('./index.js');

var config = app.get('config');
var _ = require('underscore');

var router = module.exports = express.Router();

function pth(t){
  return config.basePath+'/'+t;
}
function project_by_key(key, cb){
  cb(null, config.projects[key]);
}

router.param('project', function(req,res,next,id){
  project_by_key(id, function(err,prj){
    if(err){
      return next(err);
    }

    req.prj_key = id;
    req.prj = prj;
    next();
  });
});

router.get('/:project/branch/:branch/head', function(req, res, next){
  git.branch_commit_id(pth(req.prj_key),req.params.branch, function(err,commit){
    if(err){
      return next(err);
    }
    res.json(commit);
  });
});

router.get('/:project/branches', function(req, res, next){
  git.branches(pth(req.prj_key), function(err,branches){
    if(err){
      return next(err);
    }
    res.json(branches);
  });
});

router.get('/:project/clone', function(req, res, next){
  git.clone(req.prj.url, pth(req.prj_key), function(err){
    if(err){
      return next(err);
    }
    res.json({error: false});
  });
});

router.get('/projects', function(req, res){
  res.json(_.keys(config.projects));
});
