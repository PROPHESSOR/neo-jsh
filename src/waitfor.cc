#include <v8.h>
#include <node.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
#include <errno.h>

using namespace v8;

static void Waitfor(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    Local<Context> context = isolate->GetCurrentContext();
    int child, status;

    if (args[0]->IsInt32()) {
        child = args[0]->Int32Value(context).FromMaybe(0);

        while (waitpid(child, &status, 0) == -1) {
            if (errno != EINTR) {
                perror("waitpid");
                exit(1);
            }
        }

        Local<Object> result = Object::New(isolate);

        if (WIFEXITED(status)) {
            result->Set(context, String::NewFromUtf8(isolate, "exitCode").ToLocalChecked(), 
                        Integer::New(isolate, WEXITSTATUS(status))).ToChecked();
            result->Set(context, String::NewFromUtf8(isolate, "signalCode").ToLocalChecked(), 
                        Null(isolate)).ToChecked();
            args.GetReturnValue().Set(result);
            return;
        } else if (WIFSIGNALED(status)) {
            result->Set(context, String::NewFromUtf8(isolate, "exitCode").ToLocalChecked(), 
                        Null(isolate)).ToChecked();
            result->Set(context, String::NewFromUtf8(isolate, "signalCode").ToLocalChecked(), 
                        Integer::New(isolate, WTERMSIG(status))).ToChecked();
            args.GetReturnValue().Set(result);
            return;
        }
        args.GetReturnValue().Set(Undefined(isolate));
        return;
    } else {
        isolate->ThrowException(Exception::Error(
            String::NewFromUtf8(isolate, "Not an integer.").ToLocalChecked()));
        return;
    }
}

void Initialize(Local<Object> exports) {
    NODE_SET_METHOD(exports, "waitfor", Waitfor);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)

