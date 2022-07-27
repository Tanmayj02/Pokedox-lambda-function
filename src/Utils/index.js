const buildResponse = (statusCode, body) => {
    return {
      statusCode: statusCode,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Expose-Headers": "X-Total-Count",
        "X-Total-Count": countItems(body),
      },
      body: JSON.stringify(body),
    };
  };

  module.exports = buildResponse