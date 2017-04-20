<!-- language: lang-none -->

# Stages of execution

```
                     (1 or 9 if you like!) Trade Again or Exit
        ┌────────────────────────────────────────────────────────────────┐
        │  After Purchase : (Finish signal is Sell Price)                |
S  (8)  ^  - A proposal open contract response with sell price received  |
        │                                                                |
        ┌──────                                                          |
        │  During Purchase: (Request for sell)                           |
   (7)  ^  - Request for sell_expired or sell_at_market            <_____|
        │
        ┌─────────────────────────────────────────────────────────────────────────────┐
        │  During Purchase: (Proposal Open Contract Received)                         |
S  (6)  ^  - Contract is open (is not either sold nor expired)                        |
        │                                                                             |
        ┌──────                                                                       |
        │  Between Before Purchase and During Purchase: (Proposal Open Contract Req)  |
   (5)  ^  - proposal_open_contract requested                                   <_____|
        │
        ┌───────────────────────────────────────────────────────────────────┐
        │  Between Before Purchase and During Purchase: (Purchase Received) |
S  (4)  ^  - Purchase response is successfully received                     |
        │                                                                   |
        ┌──────                                                             |
        │  Before Purchase (Purchase Requested)                             |
   (3)  ^  - Purchase is requested but not yet successful             <_____|
        │
        ┌───────────────────────────────────────────────────────────────┐
        │  Before Purchase: (Not purchased yet)                         |
S  (2)  ^  - Requested proposals and ticks are received                 |
        │                                                               |
        ┌──────                                                         |
        │  Trade Definition: (Before Start)                             |
   (1)  ^  - Requests for ticks and proposals are sent            <_____|
        │
```
