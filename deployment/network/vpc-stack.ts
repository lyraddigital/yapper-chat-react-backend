import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { Peer, Port, SecurityGroup, SubnetType, Vpc} from '@aws-cdk/aws-ec2'

export class VpcStack extends Stack {
    readonly vpc: Vpc;
    readonly loadBalancerSecurityGroup: SecurityGroup;
    readonly fargateClusterTaskSecurityGroup: SecurityGroup;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.vpc = new Vpc(this, 'ChatAPIVPC', {
            cidr: '10.0.0.0/16',
            enableDnsHostnames: false,
            enableDnsSupport: false,
            maxAzs: 2,
            subnetConfiguration: [
                {
                    cidrMask: 24,
                    name: 'Chat API Public',
                    subnetType: SubnetType.PUBLIC,
                },
                {
                    cidrMask: 24,
                    name: 'Chat API Private',
                    subnetType: SubnetType.ISOLATED,
                }
            ],
            natGateways: 0
        });

        this.loadBalancerSecurityGroup = new SecurityGroup(this, 'Chat-Loadbalancer-SG', {
            vpc: this.vpc,
            securityGroupName: 'ChatLoadBalancerSecurityGroup',
        });
        
        this.loadBalancerSecurityGroup.addIngressRule(Peer.ipv4('0.0.0.0/0'), Port.tcp(80));
        this.loadBalancerSecurityGroup.addIngressRule(Peer.ipv6('::/0'), Port.tcp(80));
        
        this.fargateClusterTaskSecurityGroup = new SecurityGroup(this, 'Chat-Cluster-SG', {
            vpc: this.vpc,
            allowAllOutbound: false,
            securityGroupName: 'ChatAppClusterSecurityGroup',
        });

        this.loadBalancerSecurityGroup.addIngressRule(this.fargateClusterTaskSecurityGroup, Port.tcp(3000));
        this.fargateClusterTaskSecurityGroup.addEgressRule(Peer.anyIpv4(), Port.tcp(443));
    }
}