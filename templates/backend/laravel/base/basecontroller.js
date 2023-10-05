export const LARAVEL_JSON_API_BASE_CONTROLLER = `
<?php


namespace App\\Http\\Controllers\\API\\V1;


use Illuminate\\Http\\Request;
use App\\Http\\Controllers\\Controller as Controller;


class BaseController extends Controller
{
    /**
     * success response method.
     *
     * @return \\Illuminate\\Http\\JsonResponse
     */
    public function sendResponse($result, $message, $status=200)
    {
    	$response = [
            'status' => $status,
            'success' => true,
            'data'    => $result,
            'message' => $message,
        ];


        return response()->json($response, $status);
    }


    /**
     * return error response.
     *
     * @return \\Illuminate\\Http\\JsonResponse
     */
    public function sendError($error, $errorMessages = [], $code = 404)
    {
    	$response = [
            'status' => $code,
            'success' => false,
            'message' => $error,
        ];


        if(!empty($errorMessages)){
            $response['data'] = $errorMessages;
        }


        return response()->json($response, $code);
    }
}
`;


export const LARAVEL_BASE_CONTROLLER = `
<?php


namespace App\\Http\\Controllers;


use Illuminate\\Http\\Request;
use App\\Http\\Controllers\\Controller as Controller;


class BaseController extends Controller
{
    /**
     * success response method.
     *
     * @return \\Illuminate\\Http\\JsonResponse
     */
    public function sendResponse($result, $message, $status=200)
    {
    	$response = [
            'status' => $status,
            'success' => true,
            'data'    => $result,
            'message' => $message,
        ];


        return response()->json($response, $status);
    }


    /**
     * return error response.
     *
     * @return \\Illuminate\\Http\\JsonResponse
     */
    public function sendError($error, $errorMessages = [], $code = 404)
    {
    	$response = [
            'status' => $code,
            'success' => false,
            'message' => $error,
        ];


        if(!empty($errorMessages)){
            $response['data'] = $errorMessages;
        }


        return response()->json($response, $code);
    }
}
`;