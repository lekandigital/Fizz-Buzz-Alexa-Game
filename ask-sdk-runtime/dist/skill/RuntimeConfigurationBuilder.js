"use strict";
/*
 * Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var GenericErrorMapper_1 = require("../dispatcher/error/mapper/GenericErrorMapper");
var GenericHandlerAdapter_1 = require("../dispatcher/request/handler/GenericHandlerAdapter");
var GenericRequestHandlerChain_1 = require("../dispatcher/request/handler/GenericRequestHandlerChain");
var GenericRequestMapper_1 = require("../dispatcher/request/mapper/GenericRequestMapper");
var AskSdkUtils_1 = require("../util/AskSdkUtils");
var RuntimeConfigurationBuilder = /** @class */ (function () {
    function RuntimeConfigurationBuilder() {
        this.requestHandlerChains = [];
        this.requestInterceptors = [];
        this.responseInterceptors = [];
        this.errorHandlers = [];
    }
    RuntimeConfigurationBuilder.prototype.addRequestHandler = function (matcher, executor) {
        if (typeof matcher !== 'function' || typeof executor !== 'function') {
            throw AskSdkUtils_1.createAskSdkError(this.constructor.name, "Incompatible matcher type: " + typeof matcher);
        }
        this.requestHandlerChains.push(new GenericRequestHandlerChain_1.GenericRequestHandlerChain({
            requestHandler: {
                canHandle: matcher,
                handle: executor,
            },
        }));
        return this;
    };
    RuntimeConfigurationBuilder.prototype.addRequestHandlers = function () {
        var requestHandlers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            requestHandlers[_i] = arguments[_i];
        }
        for (var _a = 0, requestHandlers_1 = requestHandlers; _a < requestHandlers_1.length; _a++) {
            var requestHandler = requestHandlers_1[_a];
            this.requestHandlerChains.push(new GenericRequestHandlerChain_1.GenericRequestHandlerChain({
                requestHandler: requestHandler,
            }));
        }
        return this;
    };
    RuntimeConfigurationBuilder.prototype.addRequestInterceptors = function () {
        var executors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            executors[_i] = arguments[_i];
        }
        for (var _a = 0, executors_1 = executors; _a < executors_1.length; _a++) {
            var executor = executors_1[_a];
            switch (typeof executor) {
                case 'object': {
                    this.requestInterceptors.push(executor);
                    break;
                }
                case 'function': {
                    this.requestInterceptors.push({
                        process: executor,
                    });
                    break;
                }
                default: {
                    throw AskSdkUtils_1.createAskSdkError(this.constructor.name, "Incompatible executor type: " + typeof executor);
                }
            }
        }
        return this;
    };
    RuntimeConfigurationBuilder.prototype.addResponseInterceptors = function () {
        var executors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            executors[_i] = arguments[_i];
        }
        for (var _a = 0, executors_2 = executors; _a < executors_2.length; _a++) {
            var executor = executors_2[_a];
            switch (typeof executor) {
                case 'object': {
                    this.responseInterceptors.push(executor);
                    break;
                }
                case 'function': {
                    this.responseInterceptors.push({
                        process: executor,
                    });
                    break;
                }
                default: {
                    throw AskSdkUtils_1.createAskSdkError('SkillBuilderError', "Incompatible executor type: " + typeof executor);
                }
            }
        }
        return this;
    };
    RuntimeConfigurationBuilder.prototype.addErrorHandler = function (matcher, executor) {
        this.errorHandlers.push({
            canHandle: matcher,
            handle: executor,
        });
        return this;
    };
    RuntimeConfigurationBuilder.prototype.addErrorHandlers = function () {
        var _a;
        var errorHandlers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            errorHandlers[_i] = arguments[_i];
        }
        (_a = this.errorHandlers).push.apply(_a, errorHandlers);
        return this;
    };
    RuntimeConfigurationBuilder.prototype.getRuntimeConfiguration = function () {
        var requestMapper = new GenericRequestMapper_1.GenericRequestMapper({
            requestHandlerChains: this.requestHandlerChains,
        });
        var errorMapper = this.errorHandlers.length
            ? new GenericErrorMapper_1.GenericErrorMapper({
                errorHandlers: this.errorHandlers,
            })
            : undefined;
        return {
            requestMappers: [requestMapper],
            handlerAdapters: [new GenericHandlerAdapter_1.GenericHandlerAdapter()],
            errorMapper: errorMapper,
            requestInterceptors: this.requestInterceptors,
            responseInterceptors: this.responseInterceptors,
        };
    };
    return RuntimeConfigurationBuilder;
}());
exports.RuntimeConfigurationBuilder = RuntimeConfigurationBuilder;
//# sourceMappingURL=RuntimeConfigurationBuilder.js.map