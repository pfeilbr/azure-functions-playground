module.exports = async function (context, req) {
  context.log(`JavaScript HTTP trigger function processed a request. v3

  process.env:
  ${JSON.stringify(process.env)}

  `);

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

            req
            ${JSON.stringify(req, null, 2)}
        </code>
      </pre>`,
    };
  }
};
