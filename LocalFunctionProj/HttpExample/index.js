module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");
  console.log(JSON.stringify(process.env, null, 2));

  if (req.query.name || (req.body && req.body.name)) {
    // Add a message to the Storage queue,
    // which is the name passed to the function.
    context.bindings.msg = req.query.name || req.body.name;
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: "Hello " + (req.query.name || req.body.name),
    };
  } else {
    context.res = {
      status: 400,
      body: `<pre>
        <code>
            Please pass a name on the query string or in the request body

            process.env
            ${JSON.stringify(process.env, null, 2)}
        </code>
      </pre>`,
    };
  }
};
