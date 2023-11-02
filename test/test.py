from collections import *
from functools import cache
import pandas as pd
import seaborn as sns
import numpy as np

import matplotlib.pyplot as plt
import bisect

a = [[1,2],[3,4],[4,5]]

print(bisect.bisect_left(a,3,key=lambda x:x[0]))