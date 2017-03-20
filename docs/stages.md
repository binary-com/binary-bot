<!-- language: lang-none -->

# Stages of execution

```
        ┌───────> Trade Again or Exit (go back to (1))
        │  After Purchase: (Finish signal is Sell Price)
S  (8)  ^  - A proposal open contract response with sell price received
        |
        ┌──────> On error repeat (7)
        │  During Purchase: (Request for sell)
   (7)  ^  - Request for sell_expired or sell_at_market
        │
        ┌──────> On error go back to (5)
        │  During Purchase: (Proposal Open Contract Received)
S  (6)  ^  - Contract is open (is not either sold nor expired)
        |
        ┌──────> On error repeat (5)
        │  Between Before Purchase and During Purchase
   (5)  ^  - proposal_open_contract requested
        │
        ┌──────> On error go back to (3) (Needs to go back in the JSI too)
        │  Between Before Purchase and During Purchase
S  (4)  ^  - Purchase response is successfully received
        │
        |
        │  Before Purchase
   (3)  ^  - Purchase is requested but not yet successful
        │
        ┌──────> On error go back to (1)
        │  Before Purchase
S  (2)  ^  - Requested proposals and ticks are ready
        |
        ┌──────> On error go back to (1)
        │  Trade Definition
   (1)  ^  - Requests for ticks and proposals are sent
        │
```
