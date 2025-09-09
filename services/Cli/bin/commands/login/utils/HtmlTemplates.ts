export const successHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Nevo CLI – Login Successful</title>
  <style>/* ...same CSS as before... */</style>
</head>
<body>
  <div class="card">
    <h1>✅ Login Successful</h1>
    <p>You may now return to your terminal.<br/>This window can be closed.</p>
  </div>
</body>
</html>
`;

export const failureHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Nevo CLI – Login Failed</title>
  <style>/* ...same CSS as before... */</style>
</head>
<body>
  <div class="card">
    <h1>❌ Login Failed</h1>
    <p>Missing or invalid token.<br/>Please try running <code>nevo login</code> again.</p>
  </div>
</body>
</html>
`;
