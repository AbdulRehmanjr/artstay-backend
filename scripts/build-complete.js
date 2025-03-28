// scripts/build-complete.js
const chalk = require('chalk');
const boxen = require('boxen');

 // Try to use chalk and boxen if availabl
  // Custom success message
  const message = `
🚀 ArtStay Backend Build Complete! 🚀

Your Node.js application has been successfully built and is ready to deploy.

Run the following command to start the production server:
${chalk.chalkStderr('npm run start')}

For development mode, run:
${chalk.chalkStderr('npm run dev')}
`;

  // Print the message in a nice box
  console.log(
    boxen.default(message, {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'green',
      backgroundColor: '#555555'
    })
  );