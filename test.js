var git = require('./git.js');

//git.clone('https://github.com/Bubujka/sakura2-demo-site.git', 'demo.git', console.log.bind(console));
git.branches('demo.git', console.log.bind(console));
