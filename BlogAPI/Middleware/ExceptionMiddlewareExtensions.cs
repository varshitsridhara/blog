using Newtonsoft.Json;
using Org.BouncyCastle.Asn1.Ocsp;
using System.Net;
using System.Reflection;
/// <summary>
/// Abstract handler for all exceptions.
/// </summary>
public abstract class AbstractExceptionHandlerMiddleware { 

    /// <summary>
    /// This key should be used to store the exception in the <see cref="IDictionary{TKey,TValue}"/> of the exception data,
    /// to be localized in the abstract handler.
    /// </summary>

    private readonly RequestDelegate _next;

    /// <summary>
    /// Gets HTTP status code response and message to be returned to the caller.
    /// Use the ".Data" property to set the key of the messages if it's localized.
    /// </summary>
    /// <param name="exception">The actual exception</param>
    /// <returns>Tuple of HTTP status code and a message</returns>
    public abstract (HttpStatusCode code, string message) GetResponse(Exception exception);

    public AbstractExceptionHandlerMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception exception)
        {
            // log the error
            var response = context.Response;
            response.ContentType = "application/json";

            // get the response code and message
            var (status, message) = GetResponse(exception);
            response.StatusCode = (int)status;
            await response.WriteAsync(message);
        }
    }
}
public class ExceptionHandlerMiddleware : AbstractExceptionHandlerMiddleware
{
    public ExceptionHandlerMiddleware(RequestDelegate next) : base(next)
    {
    }

    public override (HttpStatusCode code, string message) GetResponse(Exception exception)
    {
        HttpStatusCode code;
        switch (exception)
        {
            case KeyNotFoundException
                or FileNotFoundException:
                code = HttpStatusCode.NoContent;
                break;

            case UnauthorizedAccessException:
                code = HttpStatusCode.Unauthorized;
                break;
            case 
                 ArgumentException
                or InvalidOperationException:
                code = HttpStatusCode.BadRequest;
                break;
            default:
                code = HttpStatusCode.InternalServerError;
                break;
        }
        return (code, JsonConvert.SerializeObject(new { message = (exception.Message) }));
    }
}