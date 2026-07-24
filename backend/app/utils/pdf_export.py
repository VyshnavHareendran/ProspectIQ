from io import BytesIO

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle
)

from reportlab.lib.styles import getSampleStyleSheet


class PDFExporter:


    @staticmethod
    def generate(
        summary,
        businesses,
        calls,
        employees
    ):

        output = BytesIO()

        document = SimpleDocTemplate(
            output
        )

        styles = getSampleStyleSheet()

        content = []


        content.append(
            Paragraph(
                "ProspectIQ Sales Report",
                styles["Title"]
            )
        )


        content.append(
            Spacer(1,20)
        )


        content.append(
            Paragraph(
                "Summary",
                styles["Heading2"]
            )
        )


        summary_data = [
            ["Metric","Value"],
            ["Businesses", summary.get("total_businesses",0)],
            ["Calls", summary.get("total_calls",0)],
            ["Follow Ups", summary.get("followups",0)],
        ]


        table = Table(summary_data)

        table.setStyle(
            TableStyle([])
        )


        content.append(table)


        content.append(
            Spacer(1,20)
        )


        content.append(
            Paragraph(
                "Call Details",
                styles["Heading2"]
            )
        )


        call_data = [
            [
                "Business",
                "Status",
                "Date"
            ]
        ]


        for call in calls:

            call_data.append(
                [
                    getattr(
                        call,
                        "lead_assignment_id",
                        "-"
                    ),
                    getattr(
                        call,
                        "call_status",
                        "-"
                    ),
                    str(
                        getattr(
                            call,
                            "created_at",
                            "-"
                        )
                    )
                ]
            )


        content.append(
            Table(call_data)
        )


        document.build(content)


        output.seek(0)

        return output