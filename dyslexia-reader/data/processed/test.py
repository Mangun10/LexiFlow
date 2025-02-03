import pandas as pd
df = pd.read_parquet('clear_features.parquet')
print(df.head())

ef = pd.read_parquet('clear_processed.parquet')
print(ef.head())

ff = pd.read_parquet('clear_raw.parquet')
print(ff.head())