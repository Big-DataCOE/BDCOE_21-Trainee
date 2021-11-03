#include<iostream>
using namespace std;

int main()
{
    int n,currSum=0,maxSum=0;
    cin>>n;
    int arr[n];
    for(int i=0;i<n;i++)
        cin>>arr[i];

    for(int j=0;j<n;j++)
    {
        currSum+=arr[j];
        if(currSum<0)
            currSum=0;
        if(currSum>maxSum)
            maxSum=currSum;
    }
    cout<<maxSum;

    return 0;
}