import csv
import io


class CSVExporter:

    @staticmethod
    def export(data, fields):

        output = io.StringIO()

        writer = csv.DictWriter(

            output,

            fieldnames=fields

        )

        writer.writeheader()

        for row in data:

            writer.writerow({

                field: getattr(

                    row,

                    field,

                    None

                )

                for field in fields

            })

        output.seek(0)

        return output