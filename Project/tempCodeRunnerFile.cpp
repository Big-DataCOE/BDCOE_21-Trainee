#include <iostream>

using namespace std;

int main()
{
   // cout<<"Hello World";
   int arr[0];
   const int var=10;
   const int tar=15;
   const int bar=20;
   const int sar=25;
   const int rar=30;
   arr[var]=10;
   arr[tar]=15;
   arr[bar]=20;
   arr[sar]=25;
   arr[rar]=30;
   cout<<arr[var]<<" "<<arr[tar]<<" "<<arr[bar]<<" "<<arr[sar]<<" "<<arr[rar]<<endl;
   return 0;
}