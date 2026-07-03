from app.csv.column_mapper import ColumnMapper


class PreviewGenerator:

    @staticmethod
    def generate(dataframe):

        columns = dataframe.columns.tolist()

        mapping = ColumnMapper.suggest_mapping(
            columns
        )

        return {

            "columns": columns,

            "total_rows": len(dataframe),

            "sample_rows": (
                dataframe
                .head(5)
                .fillna("")
                .to_dict(orient="records")
            ),

            "suggested_mapping": mapping[
                "suggested_mapping"
            ],

            "unmapped_columns": mapping[
                "unmapped_columns"
            ]
        }