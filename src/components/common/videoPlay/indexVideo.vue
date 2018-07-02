<template>
  <div class="content-wrapper" :style="'height: '+videoH+'px'">
    <div v-if="!ISIOS">
      <video ref="video"
             x5-video-player-type="h5"
             webkit-playsinline playsinline x-webkit-airplay
             poster="https://mt.17shanyuan.com/static/images/login/icon-logo.png"
             @click="playShow">
        <source
          src="//player.alicdn.com/video/aliyunmedia.mp4"
          type='video/mp4'>
      </video>
      <div class="img-parent" >
          <img v-if='state' @click="play" key="play"
               ref="play"
               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAFOYwZEAAAAAXNSR0IArs4c6QAAHnxJREFUeAHtnQe8FEXSwAmSRBQQRTGgCKKgogcqSZAHSFCCgocB8QwH+okCngnFM/J5cChBFAxwCoqAIDwRECUKEh9BRUDAAxQJIjlLePevue253tmZ2ZnZnd196vx+vd1dXV2ha6anpzpsvnwuV25u7izCRCeU/NYCkHMFlj9//hp6GeCcCNysYyakQCpaK+kEIjg54Bj1zMpeKipCIoUQKBChFsPxqaeeOk8hW2Pq1TCYOVUW6lImiNbKkTo5SuzqVgRVWcGtRN54441LCoA0WyG4xULszTffrKZwOnXqtFx03qcA8eJp06Zt1HECi/3111/fblRGpJjWFjGFi1VXxVnKT1AZa+xUScNbrMT2dHepisIV4v+9zTRgjPiqTMWqospHxRQa1+DBgztQIPavvmzZspcj4MVRyE4ZkO8nbCU0csKJgoNYjJA7YcKELhQYXCX+8ccfRws8ClnPSOG77757r17Jmj58+PBm0HapeoapAPzqwTT5ihQpcsOsWbOagd8Q/GmON4mibhdT+b+mIhFjHilUlZwkAqe70RkoRLtYCLVu3bqkTVmb/BS6ctYr6VII0bic9crWtOODoSPqHHV4PM5HnSpC5OaETKU4PzdmzJiaukhO6ePHj89HGoOp/jzLQ3BqgQIFrnaqKC1MWR3qzhUcs7KqAELMuypSSbqkKPyojCJgjalcEdgaK9wpb2Vih+fIGGa/UqGQVIKQ7RvHjqDALrrooiIrV678MlL+d+q/YMWNub9gGNNc1krx8qtWrTqshB03blztCM0twM5UdU2NKSwG8MCwYcP+eueddy5VCMmKubMWwLggweCp+i/DhsBcmxThzN7lnHPOqblx48ajXgWTu3bBggU3ifbC3OAumezs7C70NMoutvRAMxnrCPv27VtRokQJebnEvRQN6b0eAHtgPG2FoqoUj3o8WkJHeoFn4hHyWy6E4wkpjNv7JeyGz020XzSOp3UBED4TQj/88MOjbgTdyiZOnPiIYlawYMH6briqJYy7mkrGm6pixYr9165dKx1H3EsYxUWyIBw6dGi8gISf+RwLAGlyf/3118289ltIPpmX0lTxVK8Yg4cACxcuXFyQpk+f3iQZjOWVFGEqbxdTUTNhZQJyY2CG/XnwX6hZs2a2FccpT5OOo9XOkXKdmRO+KxxBxhG8XH92JRS0EM5nEUYS1hCWEgYQHFsuKB+jHoQ3ELxevRNiJpXhdFhxO3bs2EFA5pDbmm7UqNG1CjcS9xEaTpdtE1FR4Mel0uLFi3vVqFHjQycCdvCjR49OoyM5Rcqcbq4YxjC9CvwFkUq+Owmppy5oGW8zO+ZRjEE8i0obiY+5jfoUYS+xE3Mr44SHPXbC2DE3ey4KQ2EqgtDUhslgsVkJZjAGIHY1EVShNe7WrdvZVpjX/IYNG94H9wyFbzS1V23BM24W+t+D3LXXKCJeY1VfbjazqVVzeCHCjSef0zmTJk1q5AVf4Wzbtm2KSst7eAWZi70wVhKryir2UlfhCg3wDY0vVsCgsRAjLPJaH9w1RlOLx8FrJRc8ab0chsmuQ59I/YoG49GjRxtDEheinotatmwpDhvb8bdOxGDMYG2TDkxGGr9cMzc6BuM77rijghtSkLKGDRtOdqtnjC737Nmz6JRTTrnfDVHKvDQhdK6CnvFms6OnaBgan3zyyVfaIfmB8YzOkMfKjalGb6yMq98gdNKAvpN+nmMhDn5b+ZK4TzJt2rQpJbGf6+qrr67nhymjGMN5IjwC9dV8ln7LZ+mdfoQU3Ih9pyFsI8PGJAwB+vfvX9mNmGgnIQhTXiwLhTb1jf7dHAggTWjv4+rVqxfLyckRx35HGL9lCCA/6gqLeaSJRVtTUTMRFnM7psLLsLFiKrGSSiqceOKJMeU6rlt67ty5LZ2YGnycKlPJsLmBFBkzOeHq8PLlyxdev369emx2okhpvdxTGt7VRQB17dq1az4VY74m+KCvxV37q8KTOB6DGBvbVYBOYeCH7cosMHEWF7LAUpdF0BsJ3xISuV6n8knJltpTS7sxRSh5scmnliMtuui9W7ZsmbJ06dI5//73v7cx5baDYfYhuvpSlSpVKn3ppZdeyG3SkJek3D5u12Qs2dwNIV6Zo5BuFVFyLOU3WXG+++67wXiq37bCE8nffPPNpT/44IMxfD6cbEOnLA3wsw3cEeRZYZQ0vl91SgcPHlxL13aLDgs7/eqrr17cuXPn4RY+a1G8kgVmm42rMIrKlIz0VubFYO5qxlXHTECaEt98802HSy655CGNvUxHFNXyMUlHhVFUyswRKvmkeSZipEgQIKsHOnbs+I5GZiaKN9DyZtJWYZT7CIwbFVamWFTJ4xT/8ssvvU499dSGqhylY/SLAaCsvPfk/ZcvHc+oEjZoLMOl/fv3G0PZCI0/obc5gRY1lkJZuYUNZcWFmEiHtGbNmi7QM2ZhJB4xYoTj9GxQ5ezqHThw4DgK6p7IJfCvpXBNCwP8AaDhTOf1MojXyxCFFCQWJZ3qcevNOu200/7mVJ4suEWGwjTEEcPCFMg71VCWMeKhRJWNJ3CZMmXqizCRsKBBgwZJH1GJDGeffbZpWbLGZJZhYRibg1/L7RBPdsdyUcax0KVg4cKFvRmBjXZB8VW0e/fuQZqb4z5xuIhl5XbOxxBwzwknnJDli6IDclCFdXJ+5qL1eta0Lov4W15WCJ988snTKp0J8UknnVRFCYsxdmMM85UTVD55hs0B+/jx41cHJRR2PZlAEuUl8K4tGJSfKLxPVT7zzDNdh2UKL93x9u3bjwWVQRSerSrjzfO0HkrhpzL+6aefJkiHmminKp2W9NTmmDlRgqoR1LOn8kHi99577z5c54F6e8WP7+zCDIKU7+d4zGspKyvr2hkzZpi3uaroNw6iMHUOX3jhhQ28LgDxIhPjinkYUbl/qkgvLZd8XO+RBGsu5EtDH5oJOLQLR9nCUqVK/V8YDEaNGnWlpqz4vVbqQ8s+MDWGe8l4BbhZ+Isvvni2fv36n4ShpKJpcWOa/ljptIwL7R8hYSxqkVfAkSNHpkaKAkVPPvlkG1UR5Y+2aNGikdw5EsJWVnzwms/WVFbkMS2sCdeXdFeVFwFVOi/E4hGvVavW35WsyB+lY1RGIWGRsqS3qDyulH6XXXbZeyqfqbHlMdqBrqdaZTVvab0AxK2Rlvle4LhRuwqxQYMGVdHxMiXN4/e5Rdlz7ZQVeW0tbFUEYqYXRMqYIP389NNP727FS2VemyvT2bZHUVlW4nh5UljVRvFZpOupvMTr1q0bXqFChf46LKy0KLlo0SJ5bVrH0mLRH73w9aWwThDlt5I/XYdJ+ueff57M8/7c1q1bj1rL/OZxC9Vo167dAJbTGG4nS/1OKPmmBZaaLMrXJYR9TUuNNglwoQXuJ3zvoyWOgfsRIbTOMfAt7acdUCAL/JaEioRykbCPeFMkyBfbx16fQ3Az50I5Wb72KiGRaxWV22aOVjaSIGDPRDR0qfsTZRfZsAwESviWRhhZ3NbKjTsTb0uZF57GvPB3fJvumD9//o5zzz23GAOakrzSTr/iiitqlytXrqnDlKhOui63/Zc6IGVpFH3RySp4J8Y1a9ZMnlvxl/kObETqzBfbfgf6R4AH9mP7tjDMZFHXDmvLioD33ntv23feeWebtSyRPOP4O5kSfdCGRqDVAL4URln5hPynzhxF91111VXNlyxZckCHJzvNPowb4fOUha4482QKxXRRWcpjsp4VRtnl1K6qUxg6dOhd99xzzzc6LOw0zvnhxYsXv9jCpwJKr7PAbLOeFEbZX6htfmqx0WB7oUKFkrL9xlaqOEC2XVdlF/y7FrRrUXqWBRaTjaswysoAobiqiYPtLVbevKHy6Ypp8Pxsulpk4d8ApWdaYFFZ2+9hhYGyG0ibyn722WePZYKyIh/fwMZmbFkRp+QlnoHMFbR8TNJRYSpOAPtcVYMvl05NmjSZrvKZEvPurm1RWsbujnrZ3tJUkBmIeUopVgO8xIYiWZuVsRcy6w57WQVg/WY2ZHdS2Jwvxm88F7/xQxmrqSaYRenPUfo6rdhIxpieSmb3Tjo3rygr2gwcOPAOTcHGiG9sWdNg0T4tEGSR+CqFcMYZZ9RMhudC0UtFvHfv3qHMK18W4XUMK6vZFQNktbCp7ObNm8cnqiyTYQnvqPDbSKzYv1urUxAjZmn5/1mYgksp+FoV0jI1VDpIDD2zE2G77YZixYq1CUInSJ05c+ZcX6dOnedUXXQx+yrdwssUAgN2mX0IfFmPOCpatGh5aQAOo7kzMFEfFevWrTtRR4d3NZU3FAYgLWAqj9fR1berKjvFLHsqY1dWrVq1B0XxLl26yMrcUK+vvvrKXLsCI3OeTCk5VHHfuXNnwh/YWNTOrapY5OvXr182Z/d8YgJCSFx++eUfaGRNAyiF/6IKWST2hEoHjRnnRvWMdnQ4A+AMsfb333//iF15MmAy7avowMt4nJTCCp6PW+GgmQmYoI+IoetEChfPLaI479BLnHCCwkeOHPmoVvdFScshZbcpIKtQV6p0IjHrqTwrrPg88MAD7/DZOYNVc77rKhrWuH379ks02NmSFuJmK7Dpc4CGEDjpx8I6Ez4ESrBUcCHH0Tyjw5OZFoUvVwSZx7F+X6qilMZnnXVWC7nN+/btm7B7ls5RnP3GBc0qSbt9FNFkxl27dn0v0d4cD+pnmkwtM1phEVT15qwuaq4J7jnJEgj9NVsvLIVzPUvkEZHX5fN4OaZ4RDfRVqxYIf44dZULRWGelaQrLBLT+5/KPgyZ6fB8McuxU0MOTWHPfmJNGE9JRnHG68UTMkhY+JCGWyIUCzPCCcXCIris3NMUiJtkykdmStS1ORSFcaqFYmHe0Uv8LlOsWrVqSaUt8aZQFA7Bwrk33nhjo5IlS3bUhPeUZP/EhRri93EH+Rqy5yR9VtIsjMf0ZTym+pePZzkEsUqVKtdqFT4WC5sfCxwYVUIrDJxkTJywwvTG6xmiomtwZUWB0qVLX6sp8okoPFoBXnvttVtVOpE40WeYeaMb2BXXNhEZVF0azXTvkDwsCvdQhUyj/FWlE4mDKswr5A2xKkdHm+s8E5FDVsNb658AAznEy4CTNlvDiugn77fTYry8hffrDX54eMGdPHmybsARUkf10uZkNp+I9bwQc8PxY+EePXq0DUNZkQ8L36XJ2VXSqpcWF+pkAfCi7kN0laSDXl6Glixyef+CCy5IyDvqJl/t2rXNWU/B4+bdJrGhMJlPtdu6gCzi5HVg9t6C6OdyG3fQg++kQ2rMh4Afkr5xZ86c+aFW6U2VVre05M1BOQPucQohSMzmCmOdtbUu3sr2OPhCV1Z2rsHHXPiKQTspWaI6Kf1WbNy4cYOpU6fuVYh+Y/mUk68bqccJaeNZl2U40fzSCYLPyoCJKFw2Ule28dRWdNQzrPKzSNSXDLP901m2G3huCIZNFNFUxs8++2x5TVl5dk1lRY4oCwtAtzJTI31YJTdS4HnlQv4cTdYhKHyvljdfSzrMHG3hvX8kWcNNnUFYaYajY3TaVmWlLMbCAqSVNhOdIWm5qFjjv6nM/ZWTw1m49qQmYXnk/kHLG0m9lzbLQDzTzJDgNePro1uvm4o0/0FxhUXZV+yUFVlsFY4IqVu4gMwKpEJ4vzx69+5dsUOHDm9p9Tai7N+0fFTS9pZWGNzaV5A2pyvIH6fnTmgUpmgnI5ZhcPPmzV/RaB1A2agRllZmJN0sLM/uUrDkyAvjIi9zUTlhHUOh+HiJWZLxrEVZ2T3qqqzQdbWwYoySfyK9WOUllpNc+DjXh296cahpvsbmcacV0ph4PgTP1cKKIC0nt3VUR8Z4+3E6s0XXXHPNSQov7JjV9LJLJsei7ELkK+2VtycL68RgGLNBS07WxzvYJpk7u3We7De+noZ9TodF0q1Q9mMbuCPIt8JCCaU7EL1rpQr8yEcffdStbdu2861lfvPyAbB8+fIerBVrYVN3B7AyKBua/9uGp6H4XJS0vbjdj8g2XD7Ca1G5upfA8W/tZY2JLcH/AaPGxraChQ1Elsn/kye0VFbYevimj6pynqX5PwJJUH0CNIr6FiQdFRC0MuFDguwn9HqtA7FzmPIG6rTCFMgLbRpFPu4bEOQ2l/5BplOS/XoUx+ZqgrySZVg9nU5yE3GeujLWwBhRZBPni7wBZRIiKbNA0EnWtR9C4vobRpDzuhOeXUqWYBlJB4NeSviA4KeLAz2jruNIM5YgXx4ZcaXtCaYRpFvtR2gWpCVYI7mK78O5eBkXv//++99x1NuuIHSc6jD9cgrnWlW68sorq3OqWm1mDqrwlAZpr+nw6ELV5U68woQHETiwPBhVPgIGEM7zQgT8XBawzGPXavbjjz8+N5GpHy/8vOKw+L0IMyi18AW0YLL9Gozn6RMb+j8RuoGfMh9C6AbGRjVRahThXILrhRNjN/Ph/2IV8fjZs2fvc0XOsEKZe3z77bdbsq/7bjW7FEdE8YLfhrFnxsFLqDgUA2NUWQYmg48b4klHN5v94IMPDhw7duzOeLh5qZwtqSe/9dZb9/FHpH/2ILdsPxFjb/OA6wslqQbGsBfBfQrB8WkFJ5f/lB2Ej3dYolvefGmaRmTxU/E/UO3YF9U1Tne+BTGbgvNVssT1+u5w5YfNGhGkS11JsDUu6yPn4dRrLHPNrIob+nsxrjScHCnLDOwIma1p2rRpFvmZAre5ZFprGW15kNDSptw3KKEnGCHkiZ1DMFY02HFnYJTxm8rt5E4FDDd7c7ZHPuvyVO9BjvqULwsqT6AnGMOWIsiwX57YGOPiiT4kRyMgmCwJHRtUuN96vXr16k2Sp5oFln9hgGk3qDyZNpB/xZV/xzXXIvlpF99PMIwegcE/nZiw5OdRBhgZOWPuJHOmwDlaqlarVq36uzzRz1P2jB95PRsYw5aGsEyK275jM+WYGj/KZyou83B38LnVxUE+mbG9HEPLgCzu5amLxrjywt9OiDEu61u2y+ApU47liatxHkDgtLzhstpT3xuqiS0TLZuxye0azDEZ9wmGUE9q60u8TGIrV658XUbEJuCPRNJbgL/Sa8cI3NzVbWHwKk/yQxZYVNb1Cca4k8G2Na6cB/eHcaPaMpQMq3lH9enT51ZskWvDQM4Fka8Yx8vRwFTMplZTa00Z7UmXnOrD/pQc5513XiG+oXshn/p/phyOuhnPqv22ZcuWta73VtXydPzoo4+u4X+rG/A63GGjSB3aYroN3ADZdtFUGElpO2slGOwSB3syjvaw0vaSlxMuWNQjC/NdJ/c5w3tq9+7dX6GX+dkL3byCw9kPhTigfby+wF+TfSLddYxrOOYJxrj/T6UY4/Lk7s/KymqdLuOKIszgVItnXMHjeP5GQ4YMmSRPOWvix44ePVpWhuX5i/MpjuDuvMnhSb4efV+1KhllYBCyQOhuRQKee9ddd7VJ9wwPJ44VscoWL8+evvL8na2c5p2DA+ZL/OD3sQi0aLx6mVqO/IeZq26DPkdtZOwMvJUONw1MwYkUyHs35mJz1hPDhw//JaYgxQCMldA7li6sSOXKle9lgeocMThzzYOff/75C1KsRsLsZLNcdnZ2NwdCo9CtlCozDQygNyHm3bZp06Zx1113XUb8nQLds+3Bo0oZvzF/sFvj6aeflgbJYZfg5/RQrVm5YTsu8Us7bHzOe5jHP5APt+EjvZyslDEuw8AoKLMYD0RgUdHdd98d069HIaQww8la+g2ZVM5M0pfC8d+DpUCLaI9FbAV9unXr1iWTyiTJxHBrvomscl669eoAvJIAVYO9YMWQPO7HIVOmTJEZjYy4kv0EuyiVn7+wbYVveCoNlcN57COYvL/cBT8tRTLg/fbbb19zYG7YVDZYSZd0qx3Sww8/PMIO/nuDcdj+hfx1w9tibEaw0zl8rG2mdOW33HLLaAd7tEXewvIENyQUtyLxryJLJkyYsNsK/73n5V9U+HO9JyJd+QLOG31Y1mOlq114gg/hG/jChn9BYNeLgWUiIeaie5Z1Qhl10UVnlDwIU5DzVW/LycmZLU83HrbeHIgZMz8ettDMCThNzxpnOVa0E0D+D8gOnk4Y37F2/th0ihTFGwdLFofeThFjsyynH+uqy0QhhJSZN2+ek60qyiNRzo7v6tWr7fyedqgpg9FwGW1gvSFYL1132LBhn+IBnD1gwICqelmy03zXO61INY6utDWw5YzLZMsUiF5eMrBSkNdKMZYFv8sSpqsVLNkxR4O5GthuLVA+/oM5bQMHpwbgacgzT7BVB07FdjKCFdV3nmlbJ9frXumibbdEWo709M00jAo8wcfDoBsmTaYyN95+++1NH3vssdVh8eEYGieHzGbx7doamL35p1G2JiyhgtDNKwamp9mzcOHC1zmJauyBAwdC73V4gsVWdpdx1u5suxK+7erYwdMJy+Qumu/iNXi77mFCowZuzywOVRyTCuOKPeBVy8Eus6WL/tiukC2TTezg6YTxmZRRXfSWLVs+le5XjMpfVt3asWPHr9LRPux/auzA9+MCCLeBwq+tCNyFJdl3W90KT2ceN2FaDcz9dQj/70D53zQxKg9BD0bHaZ1G5Q9sqhQpUuQcG7usQ8blyjX0sg1CvpYtW3a2g6cLlo4nWAZJY8aMeUgMipuyLisc38mkfVX8uc79DvYwbGoYGOGHgRQzoKLbuRTlZH9vRlypegfv2LFjDhMtrcWorCJpzYqQuRnRABYhWHN2GXPadu/fLchuzDLpKyTkUPRRFhr5mBPtxYi6cVjnnFn5ueXDeoIZnR/hYLn3b7rpprfFee8mQ6aUyZZUXKFOW4jElsalumg5q1GmnWKmB+mWiuPVksXvab+SaWBWcGxjH9WT8pTibarFUp6BecW4Ygjck087nCQwAZ2GKGOZBo4AOhBvUYUq5m5pIPtlVD5dMQZOiDV7lJf17NnzFjEqf0jVjE1ynyVEME2V5UBhBno32LDfBexmHa530fIUyxFGMj+8nBC1Nkk2QzEtdoh10R/qBFKZZgnsEZ/8jrNu6SNWhA6cMWOGrUvWJ720o8v/y1oOUNZlaoIND+uAKCOqAox8JemFKq/HTE29wId1tg5LZZrJ7df5cyHHc40ZiO3mDn+NzVvjUuVoSJX+HAPRiLXp/3Dgl4VxZ1jLbA0sSBi5HtEsawXJsyBtJP9N0MeuLBUwOYy+V69ereimKmLQIzjyV/E9OCvd36Rh6i6nCzPYvceBx/UYd5JdmaOBBRkjX0a0hCDLP6IuXHPflitX7m6W9tit6ovC/SOTWAswdhjEth3pVa2X+LnrYNx51gKVtw6yFNyIqSgeLllEvTmqgAwL0aqycHyueFKsZX/kk9MCDAgvYGA5z8G4sl/7NDfjihSuT7AuJk/zp+Rt/dMsT5mG2+4JPj1CnznRZfotp+UYf4eRsqj9JUFO2Ivb3q5PsN6AEGtKXkbYMd8qfEY15OD3RfxLk+0NoNP5I+3eAvJnFDy1i1yM2xJb1PViXOHk2cCCDNHpRIUIMaM1Ka9fv35PBj1fDh48ONQ1SMLrt3bJX6rQdl/In2/QznY96wJ0LkzRBD+62xHyVJ8u+wIQpasoa1eBu/Aw/2jwMH5cEeyPy6EF5I+BmDDojzftRAcUWfwo3fEKh3JXcGADK6oYugHpyYQiCmaNmWJ7RU56s8J/z3nxRnFUcXeHp1WaRraHyoTHxETayVcXbccIAWYQZNGXvJ/32uFUq1btYW4EOWohu3///pXtcH4PsBdffLEC3jj5X4cc8UY5GPcgbXEDZYUICRlX2jThJ9hqGISXhfRTCBWsZXqeDV3LBg0a9A8Wo63V4b+1NH8sW54zNp5w+NTR1d1IRlyNgbpinZCeTrqBFXEMLc6R5wjdCa49BSs1trOhq99tt902VY4pUDTyYizTeBwZ0YC/eurmcJaGVa2+AB7HsKHoHZqBdS0w9pnk3yNk6XCntBic6bCh3PmTEvnrVyf6yYTLPxb37du3Cccd3ePRoMJeBqdyPvQPyZTFjlZKDKwzxtiyhrcn4T6C65Ot18Pou/CBf8wu/NkvvfTSCjmrQi8PO40fuDAn91TmANFrOMqplcNcrJMY4pD4F0Ge1JSu4Uq5ga0tgMEbA3uKUN9a5jUPjVwcLT/xXl/LbNM61kytZ1vnJo5T2kf6IOHQ+vXrD/F3ATKAycfkftHzzz+/KN63YpytVaxMmTIn8r/kZ5EvX6pUqfNZqlSR+eJzMEYi7TMfVi9CIuGBktd2sMNLRAE7egnDsNUVEPkroR2hdMIEU0NgN2xkRcwQDJpR3/0ZZ2A7e2B02XPbkiDvcAm2G+aAh31thYF48cSjl40xfw6bYaL084SB4ynJDSBOlkoE+cZWoSzpEjYBUD5Z3SHf7HoQ48n+oe8iYTUGzBML8JDX8foPifuM3I7XFRcAAAAASUVORK5CYII="
               alt="play" >
          <img v-else @click='play' key="pause"
               ref="pause"
               src="data:image/png;base64,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"
               alt="pause">
      </div>
      <div class="video-footer">
        <span class="time one" v-show="timer&&timeFlag">{{timeUpdate.toFixed(0)|timeFilter}}</span>
        <div class="process">
          <div :style="'height:100%;width:'+100*pw+'%'"></div>
        </div>
        <span class="time two"  v-show="timer&&timeFlag">{{duration.toFixed(0)|timeFilter}}</span>
      </div>
    </div>
    <div v-else>
      <video x5-video-player-type="h5"
             webkit-playsinline playsinline x-webkit-airplay
             poster="https://mt.17shanyuan.com/static/images/login/icon-logo.png">
        <source src="//player.alicdn.com/video/aliyunmedia.mp4"
          type='video/mp4'>
      </video>
    </div>
  </div>
</template>

<script>

  export default {
    props: {
      videoH: {
      }
    },
    data() {
      return {
        ISIOS:false,
        video: '',
        duration:0,
        state: true,
        timeUpdate:0,
        pw:0,
        timer:true,
        timeFlag:true
      }
    },
    filters:{
      timeFilter(time){
        var m=99,s=99;
        s=time%60;
        if(s<10){
          s="0"+s
        }
        m=parseInt(time/60)
        if(m<10){
          m="0"+m
        }
        return m+' : '+s
      },
    },
    created() {
    },
    mounted() {
      if (/(Android)/i.test(navigator.userAgent)) {
        var that=this
        this.$refs.video.addEventListener("canplaythrough", function() {
          that.duration=that.$refs.video.duration
          } );
        this.$refs.video.addEventListener("timeupdate",function () {
          that.timeUpdate=that.$refs.video.currentTime
          that.pw=that.timeUpdate/that.duration
        }, false);
        if(!this.duration){
          this.duration=0
        }
        this.ISIOS=false
      }else{
        this.ISIOS=true
      }

    },
    methods: {
      playShow(){
        this.timer=!this.timer
      },
      play() {
        this.timeFlag=true
        var myVideo = this.$refs.video
        this.duration=myVideo.duration
        if (myVideo.paused) {
          myVideo.play();
          this.state = false
          setTimeout(()=>{
            this.timer=false
          },2000)
        }
        else {
          myVideo.pause();
          this.state = true
        }
      },
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
  .content-wrapper {
    width: 100%;
    overflow: hidden;
    position: relative;
    .img-parent {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -0.6rem 0 0 -0.6rem;
      img {
        width: 1.2rem;
        height: 1.2rem;
      }
    }
    .video-footer {
      position: absolute;
      bottom: 1px;
      width: 100%;
      display: -webkit-flex; /* Safari */
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
      > span {
        float: left;
        width: 0.8rem;
        display: inline-block;
        font-size: .26rem;
        color: #FFFFFF;
        text-align: center;
      }
      span.one {

        padding: 0 0.2rem 0 0.3rem;
      }
      > div.process {
        flex: 1 1 auto;
        float: left;
        display: inline-block;
        height: 0.04rem;
        background: rgba(255, 255, 255, 0.30);
        border-radius: .04rem;
        > div {
          height: 100%;
          background: #4A90E2;
          border-radius: .04rem;
        }
      }
      span.two {
        padding: 0 0.3rem 0 0.2rem;
      }
    }
  }

  video {
    width: 7.5rem;
    display: block;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }
</style>
