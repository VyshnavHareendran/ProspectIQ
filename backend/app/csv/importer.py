from app.csv.csv_reader import CSVReader
from app.csv.column_mapper import ColumnMapper


class Importer:

    def load_csv(
        self,
        file_path: str
    ):
        """
        Load CSV from disk.
        """

        dataframe = CSVReader.read_from_path(
            file_path
        )

        return dataframe

    def apply_mapping(
        self,
        dataframe,
        mapping: dict
    ):
        """
        Rename CSV columns using
        the mapping selected by the user.
        """

        dataframe = ColumnMapper.apply_mapping(
            dataframe,
            mapping
        )

        return dataframe