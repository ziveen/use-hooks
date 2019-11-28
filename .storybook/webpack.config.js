const path = require("path");
const SRC_PATH = path.join(__dirname,"../src");
const {compilerOptions} = require("../tsconfig.json");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                include: [
                    SRC_PATH
                ],
                options: {
                    transpileOnly:true,
                    compilerOptions: {
                        ...compilerOptions,
                        declare: false
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js','.ts','.tsx']
    },
    plugins: [new ForkTsCheckerWebpackPlugin()]
};