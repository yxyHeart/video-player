from collections import *
from functools import cache
import pandas as pd
import seaborn as sns
import numpy as np

import matplotlib.pyplot as plt

# 生成随机脑电数据
data = np.random.randn(1, 100) 

# 设置图表样式
sns.set_style("whitegrid")

# 绘制线图
f, ax = plt.subplots(figsize=(12, 8))
sns.lineplot(data=data, palette="deep")

# 设置标题和坐标轴标签
ax.set_title("EEG Signal (18 channels, 1000 samples)")
ax.set_xlabel("Time (samples)")
ax.set_ylabel("Amplitude")

# 保存图片
plt.savefig('eeg.png')