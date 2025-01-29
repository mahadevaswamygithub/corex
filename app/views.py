from django.shortcuts import render
from rest_framework import viewsets
from app.serializers import UserSerializer, LogEntrySerializer, UserListSerializer
from app.models import User
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import (
    IsAuthenticated,
    IsAdminUser,
    AllowAny
)
from auditlog.models import LogEntry
from rest_framework.filters import SearchFilter

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [SearchFilter]
    search_fields = ['username', 'email']

    def get_serializer_class(self):
        if self.action == 'list':
            return UserListSerializer
        return super().get_serializer_class()


    def get_queryset(self):
        return super().get_queryset()


    @action(detail=False, methods=['get'], url_path='user-profile')
    def user_profile(self, request):
        user = self.get_queryset().get(id=request.user.id)
        serializer = self.get_serializer(user)
        return Response(serializer.data, status=200)


class LogEntryViewSet(viewsets.ModelViewSet):
    queryset = LogEntry.objects.all()
    serializer_class = LogEntrySerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [SearchFilter]
    search_fields = ['action', 'model_name']

data = [
    {
        "cloud_type": "Azure",
        "total_cost": 318.22,
        "account_uuid": "d1291ed2-0a2e-4429-b53b-8f831d7922dd",
        "cost_data": {
            "vaults": [
                {
                    "amount": 3e-06,
                    "resource_name": "akvisbbw",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 3e-06,
                    "resource_name": "akv7occb",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 5.12071750010993,
                    "resource_name": "vault222",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.0,
                    "resource_name": "akv5kcpt",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 3e-06,
                    "resource_name": "akvvvh21",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.0,
                    "resource_name": "akvkiwx0",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                }
            ],
            "workspaces": [
                {
                    "amount": 2.21663732272944,
                    "resource_name": "defaultworkspace-632a4dac-13b7-4f36-b98e-fc362a18a7ea-cus",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 1.11505219981866,
                    "resource_name": "defaultworkspace-632a4dac-13b7-4f36-b98e-fc362a18a7ea-eus",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                }
            ],
            "snapshots": [
                {
                    "amount": 0.000273302543837,
                    "resource_name": "clone-snapshot",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 5.5e-07,
                    "resource_name": "clone-snapshot",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.001562275,
                    "resource_name": "win-snapshot",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.001106350521617,
                    "resource_name": "clone-snapshot",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.001522540102702,
                    "resource_name": "clone-snapshot",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                }
            ],
            "applicationgateways": [
                {
                    "amount": 0.433923855367013,
                    "resource_name": "test-agw-agw",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.068055069783965,
                    "resource_name": "test-agw-agw",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.225232485509685,
                    "resource_name": "azuretest-07-10-agw",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 6.37273797499378,
                    "resource_name": "azuretest-agw-agw",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 2.76136994986906,
                    "resource_name": "test-agw-agw",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.158011499226094,
                    "resource_name": "azuretest-07-10-agw",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                }
            ],
            "virtualnetworkgateways": [
                {
                    "amount": 0.080538888888889,
                    "resource_name": "test-vpngatway-vpn-gateway",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.009869444444444,
                    "resource_name": "test-vp-vpn-gateway",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.03683314415437,
                    "resource_name": "test-vpn-gateway-vpn-gateway",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.01316685584563,
                    "resource_name": "azuretest-vpn-vpn-gateway",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                }
            ],
            "azurefirewalls": [
                {
                    "amount": 0.169097222222222,
                    "resource_name": "fd-ulayers-20250109-firewall",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.480623709012173,
                    "resource_name": "fd-ulayers-20250109-firewall",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 5.83078573826401,
                    "resource_name": "my-frontdoor-firewall",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 1.38237836455057,
                    "resource_name": "test-firewall-firewall",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.228524187046571,
                    "resource_name": "test-firewall07-firewall",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.208333333333334,
                    "resource_name": "fd-ulayers-2801-firewall",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 1.06916767976361,
                    "resource_name": "test-firewall-firewall",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 2.01228360327499,
                    "resource_name": "fd-ul-2801-firewall",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 1.56326805328019,
                    "resource_name": "azuretest-firewall-firewall",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.339583333333332,
                    "resource_name": "fd-ulayers-20250109-firewall",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.953619701190674,
                    "resource_name": "test-firewall-1301-firewall",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.211458333333334,
                    "resource_name": "azuretest-firewall-firewall",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 6.30911658190149,
                    "resource_name": "fd-ul-2801-firewall",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.216338442126703,
                    "resource_name": "fw_devops-firewall",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 2.24634399506595,
                    "resource_name": "testfirewallazure-firewall",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 1.46676549892562,
                    "resource_name": "devtestfirewall525-firewall",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                }
            ],
            "storageaccounts": [
                {
                    "amount": 0.26813586305258,
                    "resource_name": "cs410030000aef902bc",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.000403208802244,
                    "resource_name": "cs410033fff97b096e2",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 1.34628925937194,
                    "resource_name": "unityalpha",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 4.14933037573703,
                    "resource_name": "unitytest",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.001228702591447,
                    "resource_name": "azst12",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                }
            ],
            "metricalerts": [
                {
                    "amount": 0.017167962149375,
                    "resource_name": "maha-alert-rule",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.008786752281176,
                    "resource_name": "k8s-master cpu usage",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.008786752281176,
                    "resource_name": "kubernetes cpu usage",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.008786752281176,
                    "resource_name": "cpu percentage",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.008651571476851,
                    "resource_name": "virtual machine availability",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                }
            ],
            "virtualmachinescalesets": [
                {
                    "amount": 0.069444735223443,
                    "resource_name": "aks-default-41074059-vmss",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.096202214430151,
                    "resource_name": "aks-default-30037205-vmss",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.090655347503282,
                    "resource_name": "aks-default-13671394-vmss",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.01850037,
                    "resource_name": "aks-default-20658794-vmss",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.114702444967389,
                    "resource_name": "aks-default-20814634-vmss",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.016888879596841,
                    "resource_name": "aks-default-21858334-vmss",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.199805653360233,
                    "resource_name": "aks-default-30876289-vmss",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.288608908469983,
                    "resource_name": "aks-default-40601425-vmss",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 15.1585495604399,
                    "resource_name": "aks-default-72441859-vmss",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.416256038236559,
                    "resource_name": "aks-default-98714912-vmss",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.048100962,
                    "resource_name": "aks-default-82153286-vmss",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.031174211566091,
                    "resource_name": "aks-default-36621175-vmss",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.03300066,
                    "resource_name": "aks-default-17502755-vmss",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.427362641505682,
                    "resource_name": "aks-default-77990238-vmss",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                }
            ],
            "registries": [
                {
                    "amount": 0.001571655779608,
                    "resource_name": "testacr27011301",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                },
                {
                    "amount": 0.000728344220392,
                    "resource_name": "testacr27",
                    "account_name": "admin-unity@unitedlayer.com",
                    "unit": "USD"
                }
            ]
        },
        "month": "jan",
        "account_name": "admin-unity@unitedlayer.com"
    },
    {
        "cloud_type": "VMware",
        "total_cost": 0.0,
        "account_uuid": "0c43c872-0abf-42ed-bbca-772dcc75225c",
        "cost_data": {
            "virtualmachines": []
        },
        "month": "jan",
        "account_name": "test-sagar"
    },
    {
        "cloud_type": "VMware",
        "total_cost": 0.0,
        "account_uuid": "d9a4ff21-8cab-4d73-bb78-060562b30b5f",
        "cost_data": {
            "virtualmachines": []
        },
        "month": "jan",
        "account_name": "VMware vCenter"
    },
    {
        "cloud_type": "VMware",
        "total_cost": 0.0,
        "account_uuid": "2be82286-54f0-424d-895c-a97cc67cc24b",
        "cost_data": {
            "virtualmachines": []
        },
        "month": "jan",
        "account_name": "devopsVcenter"
    },
    {
        "cloud_type": "VMware",
        "total_cost": 0.0,
        "account_uuid": "75681fe5-17cb-454f-a993-5f606cf21b63",
        "cost_data": {
            "virtualmachines": []
        },
        "month": "jan",
        "account_name": "uom-96-1"
    },
    {
        "cloud_type": "VMware",
        "total_cost": 0.0,
        "account_uuid": "72ce33b5-6cf4-46e2-9077-8cebacef0178",
        "cost_data": {
            "virtualmachines": []
        },
        "month": "jan",
        "account_name": "uom-96-2-2"
    },
    {
        "cloud_type": "VMware",
        "total_cost": 0.0,
        "account_uuid": "fbb27a1f-14c5-4d69-a41a-e8b0796981f4",
        "cost_data": {
            "virtualmachines": []
        },
        "month": "jan",
        "account_name": "new account"
    },
    {
        "cloud_type": "VMware",
        "total_cost": 0.0,
        "account_uuid": "5735a424-11ab-4654-b325-f0fe7fa59d03",
        "cost_data": {
            "virtualmachines": []
        },
        "month": "jan",
        "account_name": "tesraju"
    }
]

import csv
from django.http import HttpResponse
from django.views import View

class DownloadCostCSV(View):
    def get(self, request, *args, **kwargs):
        data = get_cost()  # Assuming get_cost() returns the data shown above
        
        # Define the HTTP response as a CSV file
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="cost_data.csv"'

        writer = csv.writer(response)
        
        # Write CSV Header
        writer.writerow([
            "Cloud Type", "Account Name", "Month", "Total Cost", "Category", 
            "Resource Name", "Amount (USD)", "Account Email"
        ])
        
        # Loop through each cloud provider's data
        for item in data:
            cloud_type = item["cloud_type"]
            account_name = item["account_name"]
            month = item["month"]
            total_cost = item["total_cost"]
            
            # Extract cost data categories (e.g., vaults, workspaces, etc.)
            for category, resources in item["cost_data"].items():
                for resource in resources:
                    writer.writerow([
                        cloud_type, account_name, month, total_cost,
                        category, resource["resource_name"], 
                        resource["amount"], resource["account_name"]
                    ])
        
        return response