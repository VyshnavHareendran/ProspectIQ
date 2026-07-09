from io import BytesIO

from openpyxl import Workbook


class ExcelExporter:

    @staticmethod
    def export(data, fields, sheet_name="Report"):

        workbook = Workbook()

        worksheet = workbook.active

        worksheet.title = sheet_name

        # Header
        worksheet.append(fields)

        # Data
        for row in data:

            worksheet.append([
                getattr(row, field, None)
                for field in fields
            ])

        output = BytesIO()

        workbook.save(output)

        output.seek(0)

        return output