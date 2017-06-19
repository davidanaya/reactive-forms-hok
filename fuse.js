const {
  FuseBox,
  CSSPlugin,
  SassPlugin,
  HTMLPlugin,
  RawPlugin,
  WebIndexPlugin,
  Sparky,
  EnvPlugin
} = require('fuse-box');

const path = require('path');
const Ng2TemplatePlugin = require('ng2-fused');
const jsonServer = require('json-server');

const settings = {
  API: 'http://localhost:4444/api'
};

const fuse = FuseBox.init({
  homeDir: 'src',
  output: 'dist/$name.js',
  plugins: [
    EnvPlugin({ SETTINGS: settings }),
    Ng2TemplatePlugin(),
    ['*.component.scss', RawPlugin()],
    HTMLPlugin({
      useDefault: false
    }),
    [SassPlugin(), CSSPlugin()],
    CSSPlugin(),
    WebIndexPlugin({
      title: 'hok punchcard 👊',
      path: '.',
      template: 'src/index.html'
    })
  ]
});

fuse.dev({ root: 'dist' }, server => {
  const app = server.httpServer.app;
  app.use('/api', jsonServer.router('db.json'));
});

fuse.bundle('polyfills').instructions('> polyfills.ts');
fuse.bundle('vendor').instructions('> vendor.ts');
fuse.bundle('app').instructions('> main.ts').watch().hmr();

Sparky.task('clean', () => {
  return Sparky.src('dist').clean('dist');
});

Sparky.task('default', ['clean'], () => {
  fuse.run();
});
