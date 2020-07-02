import cdk = require('@aws-cdk/core');

import { VpcStack } from './network/vpc-stack';

const app = new cdk.App();
const stack = new VpcStack(app, 'ChatAPIVpcStack');