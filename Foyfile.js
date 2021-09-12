const { task, setGlobalOptions, fs, desc } = require('foy');

setGlobalOptions({
  loading: false
});

desc('Lint the application source code');
task('lint', async (ctx) => {
  await ctx.exec('npx eslint src/');
});

desc('Transpile the application source code');
task('build', async (ctx) => {
  await fs.rmrf('.build/');
  await ctx.exec('npx babel -d .build/ src/');
});

desc('Perform database migration');
task('migrate', ['build'], async (ctx) => {
  await ctx.exec('node .build/migrate.js');
});

desc('Run the API');
task('serve', ['build'], async (ctx) => {
  await ctx.exec('node .build');
});

desc('Develop the API');
task('develop', async (ctx) => {
  await ctx.exec(
    'npx nodemon --watch src/ --exec foy lint && foy build && node .build'
  );
});
