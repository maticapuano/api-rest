import { DELETE, GET, POST, PUT, route } from "awilix-express";
import { Request, Response } from "express";
import { SubscriptionService } from "@services/subscription.service";
import { SubscriptionCreateDto, SubscriptionUpdateDto } from "dto/subscription.dto";

@route("/subscriptions")
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @GET()
  public async all(req: Request, res: Response): Promise<Response> {
    const subscriptions = await this.subscriptionService.all();

    return res.status(200).json({
      subscriptions,
    });
  }

  @route("/:id")
  @GET()
  public async find(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    const subscription = await this.subscriptionService.find(id);

    return res.status(200).json({
      subscription,
    });
  }

  @POST()
  public async create(req: Request, res: Response): Promise<Response> {
    const { user_id, amount, code, cron } = req.body;

    const subscription = await this.subscriptionService.create({
      user_id,
      amount,
      code,
      cron,
    } as SubscriptionCreateDto);

    return res.status(201).json(subscription);
  }

  @route("/:id")
  @PUT()
  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { amount, code, cron } = req.body;

    const subscriptionUpdated = await this.subscriptionService.update(parseInt(id), {
      amount,
      code,
      cron,
    } as SubscriptionUpdateDto);

    return res.status(204).json(subscriptionUpdated);
  }

  @route("/:id")
  @DELETE()
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const subscription = await this.subscriptionService.delete(parseInt(id));

    return res.status(204).json(subscription);
  }
}
