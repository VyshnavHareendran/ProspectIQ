from app.csv.csv_reader import CSVReader
from app.csv.column_mapper import ColumnMapper
from app.csv.validator import Validator
from app.csv.duplicate_checker import DuplicateChecker


class Importer:

    def load_csv(
        self,
        file_path: str
    ):

        return CSVReader.read_from_path(file_path)

    def apply_mapping(
        self,
        dataframe,
        mapping: dict
    ):

        return ColumnMapper.apply_mapping(
            dataframe,
            mapping
        )

    def validate(
        self,
        dataframe
    ):

        valid_rows = []

        invalid_rows = []

        for index, row in dataframe.iterrows():

            row_dict = row.to_dict()

            valid, errors = Validator.validate_row(
                row_dict
            )

            if valid:

                valid_rows.append(row_dict)

            else:

                invalid_rows.append({

                    "row_number": index + 1,

                    "data": row_dict,

                    "errors": errors

                })

        return valid_rows, invalid_rows

    def remove_csv_duplicates(
        self,
        valid_rows
    ):

        return DuplicateChecker.remove_csv_duplicates(
            valid_rows
        )