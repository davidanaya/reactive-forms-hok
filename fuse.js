const {
  FuseBox,
  CSSPlugin,
  SassPlugin,
  RawPlugin,
  WebIndexPlugin,
  Sparky,
  EnvPlugin
} = require('fuse-box');

const { Ng2TemplatePlugin } = require('ng2-fused');

const settings = {
  API: 'http://localhost:8080/api'
};

const fuse = FuseBox.init({
  homeDir: 'src',
  output: 'dist/$name.js',
  plugins: [
    EnvPlugin({ SETTINGS: settings }),
    [SassPlugin(), CSSPlugin()],
    CSSPlugin(),
    Ng2TemplatePlugin(),
    WebIndexPlugin({
      title: 'hok punchcard 👊',
      path: '.',
      template: 'src/index.html'
    })
  ]
});

fuse.dev();

fuse.bundle('polyfills').instructions('> polyfills.ts');
fuse.bundle('vendor').instructions('> vendor.ts');
fuse.bundle('app').instructions('> main.ts').watch().hmr();

Sparky.task('clean', () => {
  return Sparky.src('dist').clean('dist');
});

Sparky.task('default', ['clean'], () => {
  fuse.run();
});
