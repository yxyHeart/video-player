from heapq import *

h = []
heapify(h)
for x in (3,1,2):
    heappush(h,x)
    print(h)

while h:
    print(h,h[0])
    heappop(h)