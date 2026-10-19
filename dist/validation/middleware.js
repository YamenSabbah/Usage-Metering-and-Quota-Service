import { ZodError } from "zod";
export function validate(schema) {
    return (req, res, next) => {
        try {
            req.body = schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    error: "VALIDATION_FAILED",
                    details: error.issues.map((i) => ({ field: i.path.join("."), message: i.message })),
                });
            }
            else {
                next(error);
            }
        }
    };
}
//# sourceMappingURL=middleware.js.map