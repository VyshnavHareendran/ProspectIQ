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

        buffer = BytesIO()


        doc = SimpleDocTemplate(
            buffer,
            title="ProspectIQ Sales Report"
        )


        styles = getSampleStyleSheet()


        content = []


        # Title

        content.append(
            Paragraph(
                "ProspectIQ Sales Performance Report",
                styles["Title"]
            )
        )


        content.append(
            Spacer(1,20)
        )


        # Summary

        content.append(
            Paragraph(
                "Executive Summary",
                styles["Heading2"]
            )
        )


        summary_data = [
            ["Metric","Value"],

            [
                "Total Businesses",
                summary.get(
                    "total_businesses",
                    0
                )
            ],

            [
                "Total Calls",
                summary.get(
                    "calls_made",
                    0
                )
            ],

            [
                "Interested Leads",
                summary.get(
                    "interested_leads",
                    0
                )
            ],

            [
                "Follow Ups",
                summary.get(
                    "follow_ups",
                    0
                )
            ]
        ]


        table = Table(summary_data)

        table.setStyle(
            TableStyle(
                [
                    ("GRID",(0,0),(-1,-1),0.5,None)
                ]
            )
        )


        content.append(table)

        content.append(
            Spacer(1,20)
        )


        # Calls Section

        content.append(
            Paragraph(
                "Call Details",
                styles["Heading2"]
            )
        )


        call_rows = [

            [
                "Business",
                "Employee",
                "Status",
                "Date"
            ]

        ]


        for call in calls:


            business_name = "-"

            employee_name = "-"


            if call.lead_assignment:

                if call.lead_assignment.business:

                    business_name = (
                        call
                        .lead_assignment
                        .business
                        .business_name
                    )


                if call.lead_assignment.employee:

                    employee_name = (
                        call
                        .lead_assignment
                        .employee
                        .full_name
                    )


            call_rows.append(
                [

                    business_name,

                    employee_name,

                    call.call_outcome or "-",

                    str(
                        call.created_at
                    )

                ]
            )


        call_table = Table(
            call_rows
        )


        call_table.setStyle(
            TableStyle(
                [
                    ("GRID",(0,0),(-1,-1),0.5,None)
                ]
            )
        )


        content.append(
            call_table
        )


        content.append(
            Spacer(1,20)
        )


        # Business Section


        content.append(
            Paragraph(
                "Business Details",
                styles["Heading2"]
            )
        )


        business_rows = [

            [
                "Business",
                "City",
                "Category"
            ]

        ]


        for business in businesses:


            business_rows.append(
                [

                    business.business_name,

                    business.city,

                    business.category

                ]
            )


        business_table = Table(
            business_rows
        )


        business_table.setStyle(
            TableStyle(
                [
                    ("GRID",(0,0),(-1,-1),0.5,None)
                ]
            )
        )


        content.append(
            business_table
        )


        doc.build(content)


        buffer.seek(0)


        return buffer