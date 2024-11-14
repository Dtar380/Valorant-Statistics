import pandas as pd
from pandas import DataFrame

class DatabaseManager:

    def __init__(self, url: str):
        self.url = url

    @property
    def df(self) -> DataFrame:
        df = pd.read_csv(self.url)
        return df.drop(columns=[df.columns[-1],df.columns[-2]])

    def data_amount(self, df: DataFrame = None) -> int:
        df = self.df if df is None else df
        return len(df[df.columns[0]])

    def columns(self, df: DataFrame = None) -> list:
        df = self.df if df is None else df
        return df.columns.to_list()

    def column_mode(self, column: str) -> list:
        df = self.df

        value: str = df[column].mode().to_list()[0]
        amount = int(df[column].value_counts()[value])

        return [value, amount, round(amount/self.data_amount(df)*100,2)]

    def column_table(self, column: str) -> list:
        df = self.df

        values: list = df[column].unique().tolist()
        amounts: list = [int(df[column].value_counts()[value]) for value in values]

        return [[value, amounts[i], round(amounts[i]/self.data_amount(df)*100,2)] for i, value in enumerate(values)]

    def query_combination(self, **conditions) -> list:
        df = self.df
        filtered_df = df

        for col, value in conditions.items():
            if value not in [None, ""]:
                filtered_df = filtered_df[filtered_df[col] == value]

        count = filtered_df.shape[0]
        data_amount = self.data_amount(df)

        return [["COMBINATION", count, round(count/data_amount*100,2)], ["REST", data_amount - count, round((data_amount - count)/data_amount*100,2)]]

    def query_comparison(self, **conditions) -> list:
        df = self.df

        column2 = conditions["parameter2"]
        fix_value = conditions["value"]

        if fix_value not in [None, ""]:
            filtered_df = df[df[column2] == fix_value]

        column1 = conditions["parameter1"]

        values: list = filtered_df[column1].unique().tolist()
        amounts: list = [int(filtered_df[column1].value_counts()[value]) for value in values]

        return [[value, amounts[i], round(amounts[i]/self.data_amount(filtered_df)*100,2)] for i, value in enumerate(values)]
